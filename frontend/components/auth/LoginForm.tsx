export function LoginForm() {
    return (
        <div className="max-w-sm mx-auto">
            <form>
                <div className="space-y-4">
                    <label htmlFor="email" className="block text-dark-accent">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-dark-shades text-dark-accent"/>
                </div>
            </form>
        </div>
    )
}