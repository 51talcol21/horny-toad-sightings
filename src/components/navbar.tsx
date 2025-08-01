import { useRouter } from 'next/router';

export default function Navbar() {
    const { basePath } = useRouter();

    return (
        <nav className="border-b border-goldish py-4 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-800">horny toads</div>
            <div className="space-x-4">
              <a href={`${basePath}`} className="text-gray-600 hover:text-gray-900">home</a>
              <a href={`${basePath}/about`} className="text-gray-600 hover:text-gray-900">about</a>
            </div>
          </div>
        </nav>
      );
}