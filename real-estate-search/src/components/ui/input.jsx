export function Input({ className, ...props }) {
  return <input className={`border p-2 rounded-md w-full ${className}`} {...props} />;
}
