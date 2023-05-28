import React from "react";
import styles from "./FileCard.module.scss";
import { getExtensionFromFileName } from "@/utils/getExtensionFromFilename";
import { isImage } from "@/utils/isImage";
import { Extension, getColorByExtension } from "@/utils/getColorByExtension";
import { FileTextOutlined } from "@ant-design/icons";
import Image from "next/image";

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  filename,
}) => {
  const ext = getExtensionFromFileName(filename) as Extension;
  const imageUrl =
    ext && isImage(ext) ? "http://localhost:7777/uploads/" + filename : "";

  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <Image unoptimized className={styles.image} src={imageUrl} width={100} height={100} alt="File" />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
