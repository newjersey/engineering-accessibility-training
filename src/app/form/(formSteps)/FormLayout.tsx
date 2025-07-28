// Separated this into a separate testable component because as of writing, Jest does not support testing NextJs asynchronous server components (https://nextjs.org/docs/app/guides/testing/jest)
export const FormLayout = (props: { children?: React.ReactNode; pathname: string }) => {
  return (
    <div>
      <h1 className="margin-top-4">{props.pathname}</h1>
      <div className="margin-top-4">{props.children}</div>
    </div>
  );
};
