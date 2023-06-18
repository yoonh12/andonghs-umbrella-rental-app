import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const DirectProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const processQueryString = useCallback(async () => {
    const query = queryString.parse(location.search);
    const umbId = Number(query?.umb_id);
    
    if (!isNaN(umbId)) {
      try {
        const response = await fetch("https://api.neoflux.club/send", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isRenting: false,
            umbId: umbId,
            check: false,
          }),
        });

        const { status } = response;
        const res = await response.json();
        console.log(status, res);

        if (status === 200) {
          navigate("/success", {
            state: {
              isRenting: false,
              umbId: umbId,
            },
          });
        } else if (status === 400) {
          navigate("/fail", { state: res });
        } else {
          navigate("/fail", { state: "Unknown Server Error." });
        }
      } catch (err) {
        navigate("/fail", { state: err });
      }
    } else {
      navigate("/fail", { state: "QR did not provide a number." });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    processQueryString();
  }, [processQueryString]);

  return null;
};

export default DirectProcess;
