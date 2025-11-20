export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="max-w-2xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
                <p className="mt-1">Made with ❤ by Han Myo Htwe</p>
            </div>
        </footer>
    );
}
