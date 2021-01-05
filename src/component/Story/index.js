import React from "react";
import "./Story.css";

function Index({
  title,
  id,
  points,
  author,
  url,
  date,
  comment,
  commentNum,
  storyText,
  parent,
  commentText,
}) {
  let hrefPoint = `https://news.ycombinator.com/item?id=${id}`;
  let hrefUser = `https://news.ycombinator.com/user?id=${author}`;

  let profileTitle = `See ${author} profile`;
  let calcDate = (date1, date2) => {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
    var hour = 1000 * 60 * 60;
    var minute = 1000 * 60 * 60;
    var second = 1000 * 60;

    var seconds = Math.floor(diff / second);
    var minutes = Math.floor(diff / minute);
    var hours = Math.floor(diff / hour);
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    var message = "";
    if (years > 0) message = `${years} years ago`;
    else if (months > 0) message = `${months} months ago`;
    else if (days > 0) message = `${days} days ago`;
    else if (hours > 0) message = `${hours} hours ago`;
    else if (minutes > 0) message = `${minutes} minutes ago`;
    else message = `${seconds} seconds ago`;

    return message;
  };
  let diff = calcDate(new Date(), new Date(date * 1000));
  if (comment === null)
    return (
      <article class="Story">
        <div class="Story_container">
          <div class="Story_data">
            <div class="Story_title">
              <a target="_blank" rel="noopener noreferrer" href={url}>
                {title}
              </a>

              <a
                href={hrefPoint}
                className="Story_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            </div>
            <div class="Story_meta">
              <span>
                <a
                  href={hrefPoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="See original post on HN"
                >
                  {points} points
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span>
                <a
                  href={hrefUser}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={profileTitle}
                >
                  {author}
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span>
                <a
                  href={hrefPoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={new Date(date * 1000)}
                >
                  {diff}
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span>
                <a
                  href={hrefPoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="See original post on HN"
                >
                  {commentNum} comments
                </a>
              </span>
              {storyText && (
                <div class="Story_comment">
                  <span>
                    <td dangerouslySetInnerHTML={{ __html: storyText }} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  else
    return (
      <article class="Story">
        <div class="Story_container">
          <div class="Story_data">
            <div class="Story_meta">
              <span>
                <a
                  href={hrefUser}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={profileTitle}
                >
                  {author}
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span>
                <a
                  href={hrefPoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={new Date(date * 1000)}
                >
                  {diff}
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span class="Story_link">
                <a href={`https://news.ycombinator.com/item?id=${parent}`}>
                  parent
                </a>
              </span>
              <span class="Story_separator">|</span>
              <span class="Story_link">
                on:{" "}
                <a href="https://news.ycombinator.com/item?id=null">
                  <span></span>
                </a>
              </span>
              <div class="Story_comment">
                <span>
                  <td dangerouslySetInnerHTML={{ __html: commentText }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
}

export default Index;
