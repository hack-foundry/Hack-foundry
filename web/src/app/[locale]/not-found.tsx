import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center">
        <h1>404</h1>
        <p className="lead">This page doesn’t exist.</p>
        <Link className="btn btn-primary" href="/">Home</Link>
      </div>
    </section>
  );
}
