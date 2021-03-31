import React, { FC } from "react";
import { Pagination } from "antd";

type FriendsNavPropsType = {
  currentPage: number;
  selectPage: (page: number) => void;
  totalCount: number;
  count?: number;
  togglePagesRange: (count: number) => void;
};

const FriendsNav: FC<FriendsNavPropsType> = ({
  currentPage,
  selectPage,
  totalCount,
  count = 50,
  togglePagesRange,
}) => {
  const handleTogglePagesRange = (current: number, pageSize: number) => {
    togglePagesRange(pageSize);
  };
  return (
    <div className="friends-nav">
      <Pagination
        showQuickJumper
        onShowSizeChange={handleTogglePagesRange}
        defaultCurrent={currentPage}
        defaultPageSize={count}
        total={totalCount}
        onChange={(page) => {
          selectPage(page);
        }}
      />
    </div>
  );
};

export default FriendsNav;
