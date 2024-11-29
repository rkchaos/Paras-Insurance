import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 px-40">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="font-bold text-xl mb-4">Paras Insurance</h5>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Insurance Products</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Renew your policy</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Claim</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xl mb-4">Guides</h5>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-400">Getting started</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Onbording</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Examples</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xl mb-4">Companies</h5>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-400">TATA</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">HDFC</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">NIVA BUPA</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">ABHI</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">MAGMA HDI</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">ICICI</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xl mb-4">Community</h5>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-400">Issues</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Discussions</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Corporate sponsors</Link></li>
                            <li><Link to="/" className="hover:text-gray-400">Open Collective</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center border-gray-700">
                    <div className="mb-2 flex flex-col md:flex-row justify-center items-center">
                        <ul className="flex space-x-4 mb-4 md:mb-0">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Slack</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M19.82 4.23a1.01 1.01 0 0 0-1.41-.02L16 6.42V4.01a1 1 0 0 0-2 0v5.44l-1.17 1.17a1.01 1.01 0 0 0 .02 1.41 1.01 1.01 0 0 0 1.41-.02l1.74-1.74v4.7a1 1 0 1 0 2 0v-4.7l1.74 1.74c.2.2.46.29.72.29.26 0 .52-.1.72-.31a1.01 1.01 0 0 0-.02-1.41L19.82 9.4V4.23zM4.18 19.77a1.01 1.01 0 0 0 1.41.02L8 17.58v2.41a1 1 0 0 0 2 0v-5.44l1.17-1.17a1.01 1.01 0 0 0-.02-1.41 1.01 1.01 0 0 0-1.41.02l-1.74 1.74v-4.7a1 1 0 1 0-2 0v4.7l-1.74-1.74a1.01 1.01 0 0 0-1.43 1.43L4.18 14.6v5.17z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Designed and built with all the love in the world by the RASH Technologies team.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;