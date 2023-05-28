import { Header } from '@/components/Header/Header'
import Head from 'next/head'
import React from 'react'
import styles from '@/styles/Home.module.scss';

interface LayoutProps {
  title: string
};

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  title, children
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.layout}>{children}</div>
      </main>
    </>
  )
}