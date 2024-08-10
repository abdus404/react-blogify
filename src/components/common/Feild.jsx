import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="mb-6">
      {label && (
        <label className="block mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}

function getChildId(children) {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
}
