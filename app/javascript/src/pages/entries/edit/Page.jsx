import React, { useEffect } from "react";
import EditEntry from "@features/entries/Edit";
import { useParams } from "react-router-dom";
import { currentFieldFolder } from "@features/fieldFolders/selectors";
import { useSelector, useDispatch } from "react-redux";
import { currentEntry } from "@features/entries/selectors";
import { find } from "@features/entries/entriesSlice";
import { Skeleton } from "@common/ui";

const Page = () => {
  const { id } = useParams();
  const fieldFolderId = useSelector((state) => currentFieldFolder(state)?.id);
  const entry = useSelector((state) => currentEntry(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEntry = async () => {
      await dispatch(find(fieldFolderId, id));
    };

    if (id) {
      fetchEntry();
    }
  }, [id]);

  return (
    <Skeleton height="200px" mt="4" isLoaded={entry !== null}>
      {entry && <EditEntry entry={entry} />}
    </Skeleton>
  );
};

export default Page;
