import Error, { ErrorProps } from "next/error";

const CustomErrorComponent = (props: ErrorProps) => {
    return <Error statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: any) => {
    // This will contain the status code of the response
    return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
