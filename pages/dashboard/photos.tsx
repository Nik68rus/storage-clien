import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { checkAuth } from "@/utils/checkAuth";
import { NextPageWithLayout } from "../_app";
import { Layout } from "@/layouts/Layout";
import styles from "@/styles/Home.module.scss";
import { Button, Menu } from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { UploadButton } from "@/components/UploadButton/UploadButton";
import { FileItem } from "@/api/dto/files.dto";
import { FileList } from "@/components/FileList/FileList";
import * as Api from "@/api";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return <Files items={items} withActions />
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <Layout title="Dashboard / Фото">
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('photos');

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPage;
