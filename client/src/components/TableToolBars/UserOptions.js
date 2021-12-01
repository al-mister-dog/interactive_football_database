import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Tooltip, IconButton } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import api from "../../api"

export default function UserOptions() {
  const { user, userTable } = useGlobalContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const tableId = userTable.id;
  const bookmarkeeId = userTable.user_id;
  const bookmarkerId = user.id;

  const handleClickBookmark = () => {
    isBookmarked ? unBookmarkTable() : bookmarkTable();
  };

  const checkBookmark = async () => {
    const response = await api.checkBookmark(tableId, bookmarkerId);
    const data = await response.json();
    data.length > 0 ? setIsBookmarked(true) : setIsBookmarked(false);
  };
  const bookmarkTable = async () => {
    const response = await api.bookmarkTable({
      tableId,
      bookmarkeeId,
      bookmarkerId,
    });
    const data = response.json();
    if (data.success) {
      setIsBookmarked(true);
    }
    checkBookmark();
  };
  const unBookmarkTable = async () => {
    const response = await api.unBookmarkTable({ tableId, bookmarkerId });
    const data = response.json();
    if (data.success) {
      setIsBookmarked(false);
    }
    checkBookmark();
  };
  useEffect(() => {
    checkBookmark();
  }, [userTable]);

  if (user.id) {
    return (
      <>
        {user.id !== bookmarkeeId && (
          <Tooltip title="Bookmark This Table">
            <IconButton
              color={isBookmarked ? "primary" : "default"}
              onClick={() => handleClickBookmark()}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  } else return <></>;
}
