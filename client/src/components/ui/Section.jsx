import Container from "./Container";

function Section({ children, className = "", padding = "py-20", id }) {
  return (
    <section id={id} className={`${padding} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
