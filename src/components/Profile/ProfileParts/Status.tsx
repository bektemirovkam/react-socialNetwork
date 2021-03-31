import { Input } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState, useEffect, FC } from "react";
import { StatusType } from "../../../types/types";
import { EditOutlined } from "@ant-design/icons";

type StatusPropsType = {
  status: StatusType;
  editStatus: (newStatus: { status: StatusType }) => void;
  owner: boolean;
};

const Status: FC<StatusPropsType> = ({ status, editStatus, owner }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState(status);

  useEffect(() => {
    setStatusValue(status);
  }, [status]);

  const toggleEditMode: () => void = () => {
    setEditMode(!editMode);
    if (statusValue !== status) {
      editStatus({
        status: statusValue,
      });
    }
  };

  return (
    <div className="status">
      {editMode ? (
        <>
          <Input
            autoFocus
            onBlur={toggleEditMode}
            type="text"
            value={statusValue}
            onChange={(e) => {
              setStatusValue(e.target.value);
            }}
          />
          {owner && (
            <EditOutlined
              onClick={toggleEditMode}
              style={{ fontSize: "20px" }}
              className="edit-icon"
            />
          )}
        </>
      ) : (
        <div onDoubleClick={toggleEditMode}>
          <span className="status__text">{status}</span>
          {owner && (
            <EditOutlined
              onClick={toggleEditMode}
              style={{ fontSize: "20px" }}
              className="edit-icon"
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Status;
