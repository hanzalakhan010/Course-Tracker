import { NoDataSvg } from './no-data-svg'

const NotFoundPage = () => (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
            <div className="w-full">
                <NoDataSvg />
            </div>
            <h4 className="mt-9 mb-9 text-2xl leading-snug font-medium text-gray-900">
                Sorry, we didn't find any match!
            </h4>
            <a
                href="/"
                className="rounded-md bg-yellow-500 px-6 py-2 text-white transition hover:bg-yellow-600"
            >
                Back to Home
            </a>
        </div>
    </div>
)

export default NotFoundPage