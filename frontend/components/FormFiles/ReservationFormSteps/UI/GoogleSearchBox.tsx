import { TextField } from "@mui/material";
import { StandaloneSearchBox } from "@react-google-maps/api";
import React, { RefObject, useState } from "react";

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
