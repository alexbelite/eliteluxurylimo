// React Imports
import React, { useState } from "react";

// UI Imports
import { TextField } from "@mui/material";

// Third part Imports
import { StandaloneSearchBox } from "@react-google-maps/api";

const GoogleSearchBox = ({
  isLoaded,
  onChange,
  ...rest
}: {
  isLoaded: boolean;
  onChange: (searchBox: any) => void;
  [key: string]: any;
}) => {
  const [searchBox, setSearchBox] = useState<any>(null);
  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={() => onChange(searchBox)}
        >
          <TextField
            sx={{
              "& input": {
                textAlign: "start!important",
              },
            }}
            {...rest}
            variant="outlined"
          />
        </StandaloneSearchBox>
      )}
    </>
  );
};

export default React.memo(GoogleSearchBox);
