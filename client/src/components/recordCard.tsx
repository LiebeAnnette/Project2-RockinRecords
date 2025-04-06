import { Link } from "react-router-dom";

<Link to={`/album/${encodeURIComponent(record.title)}`}>{record.title}</Link>;
