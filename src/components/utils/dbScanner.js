import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { QrScanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";
import moment from "moment";

const qrURL = process.env.REACT_APP_QR_URL_PREFIX; // URL of QR Code e.g.) https://umbrella.andong.hs.kr/quick?umbid=100

const Scanner = ({
  isRenting,
  popRes,
  setPopRes,
  umbId,
  setUmbId,
  setShowAskPop,
  setShowAvailPop,
  setShowNoUmbPop,
  setLoading,
}) => {
  // subscription
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);

  useEffect(() => {
    async function fetchSubscriptionInfo() {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (!registration) {
          console.log("Service Worker not available.");
          return;
        }

        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          console.log("Subscription information:", subscription);
          setSubscriptionInfo(subscription);
        } else {
          console.log("Subscription not found.");
        }
      } catch (error) {
        console.error("Error while fetching subscription information:", error);
      }
    }

    fetchSubscriptionInfo();
  }, []);

  const rentalDateDB = moment().format("YYYY-MM-DD HH:mm:ss");
  const returnDateDB = moment().add(4, "days").format("YYYY-MM-DD");

  const navigate = useNavigate();
  const { state } = useLocation(),
    stdId = state?.stdId;

  const handleDecode = useCallback(
    async (qrVal) => {
      const params = new URLSearchParams(qrVal);

      const queryStringValue = params.get(qrURL);

      if (queryStringValue?.length > 3) {
        return;
      }

      const umbId = Number(queryStringValue);
      console.log(queryStringValue);

      if (isNaN(umbId) || umbId <= 0) {
        navigate("/fail", { state: "QR provide an invalid value." });
        return;
      }

      if (popRes === false && isRenting === true) {
        setUmbId(umbId);
        setShowAskPop(true);
      } else if (popRes === true || isRenting === false) {
        setLoading(true);

        const requestData = {
          isRenting,
          stdId,
          umbId,
          rentalDate: rentalDateDB,
          returnDate: returnDateDB,
          willChk: false,
          subscription: JSON.stringify(subscriptionInfo),
        };

        console.log(requestData);

        try {
          // Using async/await for making the axios POST request
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api`,
            requestData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          setLoading(false);

          const status = response.status;
          const res = response.data;
          console.log(res);

          if (res === true) {
            // If no umbrella on db
            setUmbId(umbId);
            setShowNoUmbPop(true);
          } else if (res.isAvailable === false) {
            setShowAskPop(false);
            setShowAvailPop(true);
          } else if (status === 200 && res.outOfDate !== undefined) {
            navigate("/delay", { state: { outOfDate: res.outOfDate } });
          } else if (status === 200) {
            navigate("/success", {
              state: {
                isRenting,
                stdId,
                umbId,
              },
            });
          } else {
            navigate("/fail", {
              state: "Unknown Server Error.",
            });
          }
        } catch (err) {
          navigate("/fail", { state: err.message });
        }
      } else {
        navigate("/fail", { state: "Can't get respond from ScanRental" });
      }
    },
    [
      navigate,
      isRenting,
      popRes,
      stdId,
      setUmbId,
      setShowAskPop,
      setShowAvailPop,
      setShowNoUmbPop,
      setLoading,
      rentalDateDB,
      returnDateDB,
      subscriptionInfo,
    ]
  );

  useEffect(() => {
    if (popRes === true) {
      handleDecode(qrURL + "=" + umbId);
      setPopRes(false);
    }
  }, [popRes, handleDecode, umbId, setPopRes]);

  useEffect(() => {
    window.onpopstate = () => {
      console.log("Back");
      if (isRenting === true) {
        window.location.replace("/rental");
      } else {
        window.location.replace("/");
      }
    };
  }, [isRenting]);

  return (
    <QrScanner
      scanDelay={700}
      onDecode={handleDecode}
      onError={(err) => navigate("/fail", { state: err?.message })}
    />
  );
};

Scanner.propTypes = {
  isRenting: PropTypes.bool,
  popRes: PropTypes.bool,
  setPopRes: PropTypes.func,
  umbId: PropTypes.number,
  setUmbId: PropTypes.func,
  setShowAskPop: PropTypes.func,
  setShowAvailPop: PropTypes.func,
};

export default Scanner;
