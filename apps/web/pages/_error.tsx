import * as Sentry from '@sentry/nextjs'

function Error({ statusCode }: any) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = async (contextData: any) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  // ...other getInitialProps code
};

export default Error
