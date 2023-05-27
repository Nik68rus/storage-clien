import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import nookies from 'nookies';
import axios from '@/core/axios';
import * as Api from '@/api';
import { checkAuth } from '@/utils/checkAuth';
import { Header } from '@/components/Header/Header';

const DashboardPage: NextPage = () => {
  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const authProps = await checkAuth(ctx);

  if('redirect' in authProps) {
    return authProps
  }

  return {
    props: {}
  }
};

export default DashboardPage;
