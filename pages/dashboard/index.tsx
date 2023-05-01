import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import nookies from 'nookies';
import axios from '@/core/axios';
import * as Api from '@/api';
import { checkAuth } from '@/utils/checkAuth';

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return checkAuth(ctx);
};

export default DashboardPage;
