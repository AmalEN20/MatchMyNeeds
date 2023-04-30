// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_REQUEST } from "../../utils/mutations";

const HandleDelete = () => {
  const { requestId } = useParams();

  const [removeRequest] = useMutation(REMOVE_REQUEST);

  const handleChange = async (event) => {
    event.preventDefault();

    try {
      const data = await removeRequest({
        variables: { requestId },
      });

      window.location.href = "/request/me";
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleChange}>Delete request</button>;
};

export default HandleDelete;
