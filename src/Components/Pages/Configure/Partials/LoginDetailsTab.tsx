import { ChangeEvent, memo, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeLoginDetailsUpdating, makeUserIdentifier } from "../../../../Slices/Configuration";
import { Button, TextField, Typography } from "../../../UI";
import Spinner from "../../../Common/Spinner";
import { CommonObjType } from "../../../../CustomTypes";
import { initUpdateLoginDetails } from "../../../../ActionCreators/Configurations";

const defaultErrors: CommonObjType = {
  currentPassword: '',
  newPassword: '',
  retypePassword: '',
};

const emptyPassword = 'Password Cannot be empty.';
const emptyNewPassword = 'New Password Cannot be empty.';
const emptyRetypePassword = 'Retype Password Cannot be empty.';

const JobSettingTab = () => {
  const dispatch = useDispatch();
  const identifier = useSelector(makeUserIdentifier);
  const isUpdating = useSelector(makeLoginDetailsUpdating);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [errors, setErrors] = useState(defaultErrors);

  const onValidate = (key: string, value: string) => {
    if (key === 'currentPassword' &&  !value) {
      setErrors({
        ...errors,
        [key]: emptyPassword,
      });
      return false;
    }

    if (key === 'newPassword' && !value) {
      setErrors({
        ...errors,
        [key]: emptyNewPassword,
      });
      return false;
    }

    if (key === 'newPassword' && retypePassword && value !== retypePassword) {
      setErrors({
        ...errors,
        [key]: 'Passwords Mismatched',
        retypePassword: 'Passwords Mismatched',
      });
      return false;
    }

    if (key === 'retypePassword' && !value) {
      setErrors({
        ...errors,
        [key]: emptyRetypePassword,
      });
      return false;
    }

    if (key === 'retypePassword' && newPassword && value !== newPassword) {
      setErrors({
        ...errors,
        [key]: 'Passwords Mismatched',
        newPassword: 'Passwords Mismatched'
      });
      return false;
    }

    if (key !== 'currentPassword' && retypePassword && newPassword) {
      setErrors({
        ...errors,
        retypePassword: '',
        newPassword: '',
      });
      return true;  
    }

    setErrors({
      ...errors,
      [key]: '',
    });
    return true;
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentPassword(value);
    onValidate('currentPassword', value);
  };

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPassword(value);
    onValidate('newPassword', value);
  };

  const onChangeRetypePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRetypePassword(value);
    onValidate('retypePassword', value);
  };

  const onSaveChanges = async (event: SyntheticEvent) => {
    const hasErrors = Object.values(errors).some(value => !!value);

    if (hasErrors) return;

    if (currentPassword && newPassword && retypePassword) {
      const data = {
        originalPassword: currentPassword,
        newPassword,
        retypePassword,
      };
      dispatch(initUpdateLoginDetails(data));
      return;
    }

    setErrors({
      currentPassword: !currentPassword ? emptyNewPassword : '',
      newPassword: !newPassword ? emptyNewPassword : '',
      retypePassword: !retypePassword ? emptyRetypePassword : '',
    });
  };

  return (
    <Spinner backdropProps={{ open: isUpdating }}>
      <div className="job-setting-tab">
        <div className="field-container">
          <div className="field-column">
            <div className="section-title">
              <Typography variant="h4">Update Your Password</Typography>
            </div>
            <div className="field-section column-flex-multiple">
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={onChangePassword}
                helperText={errors.currentPassword}
                hasError={!!errors.currentPassword}
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={onChangeNewPassword}
                helperText={errors.newPassword}
                hasError={!!errors.newPassword}
              />
              <TextField
                label="Retype New Password"
                type="password"
                value={retypePassword}
                onChange={onChangeRetypePassword}
                helperText={errors.retypePassword}
                hasError={!!errors.retypePassword}
              />
            </div>
          </div>
          <div className="field-column">
            <div className="section-title">
              <Typography variant="h4">Username</Typography>
            </div>
            <div className="field-section column-flex-multiple">
              <TextField
                label="Identifier"
                disabled
                value={identifier}
              />
            </div>
          </div>
        </div>
        <div className="action-section">
          <Button color="primary" variant="contained" onClick={onSaveChanges}>
            Save
          </Button>
        </div>
      </div>
    </Spinner>
  );
};

export default memo(JobSettingTab);
