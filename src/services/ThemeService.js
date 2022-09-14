import invokeApiCall from 'src/helpers/apiHelper';
import { GET } from 'src/constants/requestTypes';

// import { request, ResponseProps } from '../request';


// interface PreferenceData {
//     themeId: String;
// }

// interface Colors {
//     headerColor: string;
//     textColor: string;
// }

// interface Fonts {
//     font: string;
//     fontSize: string;
// }

// export interface ThemeProps {
//     colors: Colors;
//     fonts: Fonts;
// }

// interface ThemeData {
//     id: Id;
//     content: ThemeProps;
// }

// export const PREFERENCE_API_ENDPOINT = `${appData.apiGatewayUrl}${PREFERENCE_ENDPOINT}`;
// export const THEME_API_ENDPOINT = `${appData.apiGatewayUrl}${THEME_ENDPOINT}`;

// const getPreferenceThemeId = async (): Promise<Id | null> => {
//     const res: ResponseProps = (await request.get(PREFERENCE_API_ENDPOINT)) as ResponseProps;
//     if (res.data) {
//         const preferenceData: PreferenceData = res.data as PreferenceData;
//         return preferenceData.themeId;
//     }
//     return null;
// };

export function getPreferenceThemeId(apiEndPoint) {
    return invokeApiCall({
      // endPoint: PREFERENCE_API_ENDPOINT,
      endPoint: apiEndPoint,
      apiParams: {},
      shouldShowSuccessMessage : false,
      requestType: GET,
      setAccessToken: false
    }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
      if (success) {
        return { success, data: responseData.data.themeId };
      }
      if(!success) {
            return { success, errors, showInlineAlerts };
      }
      
    });
  }

  export function getSelectedTheme(themeId, apiEndPoint) {
    // const themeId = await getPreferenceThemeId();

    if(themeId) {
        return invokeApiCall({
            endPoint: apiEndPoint + '/' + themeId,
            apiParams: {},
            shouldShowSuccessMessage : false,
            requestType: GET,
            setAccessToken: false
          }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
            if (success) {
              return { success, data: responseData.content };
            }
            if(!success) {
                  return { success, errors, showInlineAlerts };
            }
            
          });
        }
        return { success: false };
    }

  


// export const getSelectedTheme = async (): Promise<{ success: boolean; data?: ThemeProps }> => {
//     const themeId = await getPreferenceThemeId();
//     if (themeId) {
//         const res: ResponseProps = (await request.get(`${THEME_API_ENDPOINT}/${themeId}`)) as ResponseProps;
//         if (res.data) {
//             const themeData: ThemeData = res.data as ThemeData;
//             return { success: true, data: themeData.content };
//         }
//         return { success: false };
//     }
//     return { success: false };
// };
