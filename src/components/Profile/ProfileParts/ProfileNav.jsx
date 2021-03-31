import React from "react";

const ProfileNav = React.memo(() => {
  return (
    <nav className="profile__nav nav-profile">
      <ul className="nav-profile__list">
        <li>
          <a href="" className="nav-profile__link">
            Posts
          </a>
        </li>
        <li>
          <a href="" className="nav-profile__link">
            About
          </a>
        </li>
        <li>
          <a href="" className="nav-profile__link">
            Friends
          </a>
        </li>
        <li>
          <a href="" className="nav-profile__link">
            Albums
          </a>
        </li>
        <li>
          <a href="" className="nav-profile__link">
            Videos
          </a>
        </li>
        <li>
          <a href="" className="nav-profile__link">
            Followers
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default ProfileNav;
