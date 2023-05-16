import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import VideoPreview from "./videoPreview";
import VideoPreviewImage from "./videoPreviewImage";
import VideoPreviewTitle from "./videoPreviewTitle";
import VideoPreviewSubtitle from "./videoPreviewSubtitle";
import VideoPreviewTimer from "./videoPreviewTimer";
import VideoPreviewTag from "./videoPreviewTag";

const videoPreviewExample = (props?: any) => (
  <VideoPreview {...props}>
    <VideoPreviewImage data-testid="video-preview-img">
      <img src="https://th.bing.com/th/id/OIP.sfpxOWBm9ecBIcKQwsG1fwHaE7" />
    </VideoPreviewImage>
    <VideoPreviewTitle data-testid="video-preview-title">This is the title of the video</VideoPreviewTitle>
    <VideoPreviewSubtitle data-testid="video-preview-subtitle">And this is the subtitle of the video</VideoPreviewSubtitle>
    <VideoPreviewTag data-testid="video-preview-tag">TAG</VideoPreviewTag>
    <VideoPreviewTimer data-testid="video-preview-timer">05:55</VideoPreviewTimer>
  </VideoPreview>
);
const videoPreviewExampleOnlyImg = (props?: any) => (
  <VideoPreview {...props}>
    <VideoPreviewImage data-testid="video-preview-img">
      <img src="https://th.bing.com/th/id/OIP.sfpxOWBm9ecBIcKQwsG1fwHaE7" />
    </VideoPreviewImage>
  </VideoPreview>
);

it("Video preview should render", () => {
  const component = renderer.create(videoPreviewExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Video preview small should render", () => {
  const component = renderer.create(videoPreviewExample({ large: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Video preview large should render", () => {
  const component = renderer.create(videoPreviewExample({ small: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Video preview only with image should render", () => {
  const component = renderer.create(videoPreviewExampleOnlyImg());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Display video preview with video preview image", () => {
  const { container } = render(videoPreviewExample());
  const videoImage = container.getElementsByClassName("video-preview-image")[0];
  expect(videoImage).toBeInTheDocument();
});

it("Display video preview with title", () => {
  const { container } = render(videoPreviewExample());
  const title = container.getElementsByClassName("video-preview-title")[0];
  expect(title).toBeInTheDocument();
});

it("Display video preview with subtitle", () => {
  const { container } = render(videoPreviewExample({ large: true }));
  const subtitle = container.getElementsByClassName("video-preview-subtitle")[0];
  expect(subtitle).toBeInTheDocument();
});

it("Display video preview with timer", () => {
  const { container } = render(videoPreviewExample());
  const timer = container.getElementsByClassName("video-preview-timer")[0];
  expect(timer).toBeInTheDocument();
});
