import React from "react";
import { FileItem } from "@/api/dto/files.dto";
import { FileActions } from "@/components/FileActions/FileActions";
import { FileList, FileSelectType } from "@/components/FileList/FileList";
import { Empty } from "antd";

import * as Api from "@/api";

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const onFileSelect = (id: string, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, +id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== +id));
    }
  };

  const onClickRemove = () => {
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
    setSelectedIds([]);
  };

  const onClickShare = () => {
    alert("share");
  };

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect}/>
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};
