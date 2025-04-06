import {
  memo,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import { Autocomplete, TextField, CircularProgress, MenuItem } from "../../UI";
import { PlaceResult } from "../../../CustomTypes";
import LocationIcon from '@mui/icons-material/LocationOn';

const googleMapApi = 'https://maps.googleapis.com/maps/api/js';
const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const scriptTagId = 'google_map_script';

type GoogleAutocompleteProps = {
  searchLabel?: string,
  endIcon?: ReactNode,
  targetRegion?: string,
  types?: string[],
  setPlaceData: (data: PlaceResult | null) => void
};

type TermType = {
  offset: number,
  value: 0,
};

const GooglePlacesAutocomplete = ({
  searchLabel = 'Search Places',
  endIcon = null,
  targetRegion = 'au',
  types = ['locality', 'political'],
  setPlaceData,
}: GoogleAutocompleteProps ) => {

  const loadGoogleScript = () => {
    const scriptTag = document.getElementById(scriptTagId);
    if (scriptTag) return;

    const script = document.createElement("script");
    script.id = scriptTagId;
    script.src = `${googleMapApi}?key=${googleApiKey}&libraries=places&region=AU`;
    script.async = true;
    document.head.appendChild(script);
  };

  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGoogleScript();
  }, []);

  const fetchPlaceData = (placeId: string) =>  {
    if (!placeId) return;

    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    const request = {
      placeId: placeId,
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceData(place)
      } 
    });
  };

  const onChangeSearch = (value: string) => {
    fetchPlaces(value);
  };

  const fetchPlaces = useCallback(
    _debounce(
      (input: string) => {
        if (!input) return;

        const service = new window.google.maps.places.AutocompleteService();
        setLoading(true);

        service.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: targetRegion },
            types,
          },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setOptions(predictions);
            }
            setLoading(false);
          }
        );
      },
      500,
    ),
    []
  );

  const renderOptionLabel = (option: any) => {
    return option.description;
  };

  const renderOption = (props: any, option: any) => {
    const terms: TermType[] = _get(option, 'terms', []);
    const [mainElement, ...restTerms]  = terms;
    const mainPart = mainElement ? mainElement.value : '';
    const subPart = restTerms.map(item => item.value).join(', ');

    return (
      <MenuItem
        key={option.place_id}
        {...props}
      >
        <div className="autocomplete-option">
          <LocationIcon className="icon" />
          <span className="main">{mainPart}</span>
          <span className="sub">{subPart}</span>
        </div>
      </MenuItem>
    );
  }

  const onSelectionOption = (event: SyntheticEvent, selected: any) => {
    if (!selected) return;

    fetchPlaceData(selected.place_id)
  };
   
  return (
    <Autocomplete
      options={options}
      getOptionLabel={renderOptionLabel}
      onInputChange={(event, value) => {
        onChangeSearch(value);
      }}
      onChange={onSelectionOption}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          label={searchLabel}
        />
      )}
      renderOption={renderOption}
      popupIcon= {loading ? <CircularProgress size={20} /> : endIcon}
    />
  );
};

export default memo(GooglePlacesAutocomplete);
