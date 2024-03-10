export enum Routes {
  Dashboard = '/(auth)/dashboard',
  Profile = '/(auth)/(settings)/settings',
  SignIn = '/(public)/sign-in',
  TransactionView = '/(auth)/(transactions)/view-edit-transaction',
  Account = '/(auth)/(settings)/account',
}

export const routes = {
  dashboard: Routes.Dashboard,
};
