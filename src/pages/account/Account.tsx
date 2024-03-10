import React, { useCallback, useState } from 'react';

import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { Texts } from './Account.texts';
import AcountForm from './account-form/AcountForm';
import { useGetUser } from '@/src/hooks/useGetUser';
import Spinner from '@/src/ui/spinner/Spinner';
import { FormMode } from './account-form/AccountForm.types';
import AccountHeader from './account-header/AccountHeader';

const Account: React.FC = () => {
  const user = useGetUser();
  const [mode, setMode] = useState<FormMode>(FormMode.View);

  const handleChangeMode = useCallback((newMode: FormMode) => {
    setMode(newMode);
  }, []);

  return (
    <PageWithKeyboardInsets>
      <AccountHeader mode={mode} onChangeMode={handleChangeMode} />
      {!user ? (
        <Spinner />
      ) : (
        <AcountForm mode={mode} onChangeMode={handleChangeMode} user={user} />
      )}
    </PageWithKeyboardInsets>
  );
};

export default Account;
