// useAnalyticsData.js
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

function useAnalyticsData(clientId, requestParams) {
  const [data, setData] = useState(null);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
      }).then(() => {
        gapi.client.analyticsreporting.reports.batchGet(requestParams)
          .then((response) => {
            setData(response.result);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      });
    });
  }, [clientId, requestParams]);

  return data;
}

export default useAnalyticsData;
