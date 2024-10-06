import { Link } from 'react-router-dom';
import { DiNancy } from "react-icons/di";

const Footer = () => {
    return (
        <footer className="rounded-lg shadow dark:bg-gray-900 px-5 md:px-20 pb-20 sm:pb-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex sm:items-center sm:justify-between justify-start items-start flex-col sm:flex-row">
                    <Link to="/" className='flex justify-center items-center'>
                        <DiNancy className='text-3xl' />
                        <h1 className='text-xl font-bold font-raleway'>LuckyJob</h1></Link>
                    <ul className="flex flex-wrap items-center mb-3 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 mt-3">
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm mt-5 text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="/" className="hover:underline">LuckJob™</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
