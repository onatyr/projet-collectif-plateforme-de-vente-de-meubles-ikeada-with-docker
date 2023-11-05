import { PropTypes } from "prop-types";

import DeleteButton from "./atoms/DeleteButton";
import EditButton from "./atoms/EditButton";
import StashButton from "./atoms/StashButton";
import PublishButton from "./atoms/PublishButton";

// ce composant affiche différents boutons selon le statut et la disponibilité du meuble
export default function TableActions({ status, available }) {
  if (status && available) {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton />
        <StashButton />
        <DeleteButton />
      </td>
    );
  } else if (available) {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton />
        <PublishButton />
        <DeleteButton />
      </td>
    );
  } else {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton />
        <DeleteButton />
      </td>
    );
  }
}

// vérification du type des props
TableActions.propTypes = {
  status: PropTypes.bool,
  available: PropTypes.bool,
};
