import { ExportProps } from "./useResponse";

export type SessionTypes = 'user' | 'credential';
export type ExpireTypes = '1h' | '12h' | '1d';

interface SessionData {
  data: any;
  exp: ExpireTypes;
  timestamp: number;
}

interface SetSessionItemProps {
  name: SessionTypes;
  data: any;
  exp: ExpireTypes;
}

export const setSessionItem = ({
  name,
  data,
  exp
}: SetSessionItemProps): ExportProps => {
  try {
    const sessionData: SessionData = {
      data,
      exp,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem(name, JSON.stringify(sessionData));

    return {
      data: true,
      message: "Set item work!"
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: false,
      message: `Fail to set item!, Error: ${error.message}`
    };
  }
};

export const getSessionItem = ({ name }: { name: SessionTypes }): ExportProps => {
  try {
    const item = sessionStorage.getItem(name);

    if (!item) {
      return {
        data: null,
        message: "Item not found in session storage"
      };
    }

    const sessionData: SessionData = JSON.parse(item);
    const isExpired = checkExpiration(sessionData.timestamp, sessionData.exp);

    if (isExpired) {
      sessionStorage.removeItem(name);
      return {
        data: null,
        message: "Get item fail!, item expired"
      };
    }

    return {
      data: sessionData.data,
      message: "Get item work!"
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      message: `Fail to get item!, Error: ${error.message}`
    };
  }
};

const checkExpiration = (timestamp: number, expType: ExpireTypes): boolean => {
  const currentTime = Date.now();
  const expMilliseconds = getExpirationMilliseconds(expType);
  
  return currentTime - timestamp > expMilliseconds;
};

const getExpirationMilliseconds = (expType: ExpireTypes): number => {
  switch (expType) {
    case '1h':
      return 60 * 60 * 1000; // 1 hour
    case '12h':
      return 12 * 60 * 60 * 1000; // 12 hours
    case '1d':
      return 24 * 60 * 60 * 1000; // 1 day
  }
};

export const removeSessionItem = ({ name }: { name: SessionTypes }): ExportProps => {
  try {
    sessionStorage.removeItem(name)
    window.location.reload();

    return {
      data: true,
      message: `Remove item ${name} successfully!`
    }
  } catch (error: any) {
    return {
      data: false,
      message: `Something went wrong!, ${error.message}`
    }
    
  }

}