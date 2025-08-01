"use client";

import { formatFormProgressUrl, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import { Button, ButtonGroup, Link } from "@trussworks/react-uswds";

const FormProgressButtons: React.FC = () => {
  const formProgressPosition = useFormProgressPosition();

  return (
    <>
      <div className="display-flex flex-column flex-align-end">
        <div className="right-align">
          <ButtonGroup type="default">
            {formProgressPosition.previous !== null && (
              <Link
                key="previous"
                href={formatFormProgressUrl(formProgressPosition.previous)}
                className="usa-button usa-button--outline margin-top-0"
              >
                Previous
              </Link>
            )}
            {formProgressPosition.next !== null && (
              <Button key="next" type="submit" className="margin-top-0">
                Next
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default FormProgressButtons;
