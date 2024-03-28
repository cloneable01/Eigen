import React from "react";
import { Article } from "../model";
import { Col, Row, Spin, Tooltip } from "antd";
import { fallbackImageURL } from "./Image";

const NewsList = ({ data, loading }: { data: Article[]; loading: boolean }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImageURL;
  };

  const formatDate = (dateString: string) => {
    const options = {
      day: "2-digit" as const,
      month: "long" as const,
      year: "numeric" as const,
      hour: "numeric" as const,
      minute: "2-digit" as const,
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <>
      {!loading ? (
        <Row gutter={[16, 16]}>
          {data.map((article, index) => (
            <Col key={index} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <Tooltip title={article.source?.name ?? "News"}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden"
                >
                  <div className="relative overflow-hidden item-container max-w-[600px] mx-auto lg:mx-0">
                    <div className="news-item h-[500px]">
                      <div className=" text-black  font-bold text-2xl text-justify">
                        {article.title}
                      </div>
                      <div className="title-container font-sans">
                        <div className="flex justify-between">
                          <div className="text-ellipsis text-gray-400 overflow-hidden max-w-[200px] whitespace-nowrap text-left">
                            {article.author}
                          </div>
                          {article.publishedAt && (
                            <div className="text-ellipsis text-gray-400 overflow-hidden max-w-[200px] whitespace-nowrap text-left">
                              {formatDate(article.publishedAt)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="image-container overflow-hidden">
                        <img
                          src={article.urlToImage}
                          className="news-image w-full"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="description">{article.description}</div>
                  </div>
                </a>
              </Tooltip>
            </Col>
          ))}
        </Row>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
};

export default NewsList;
