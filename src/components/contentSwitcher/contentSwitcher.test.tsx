import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ContentSwitcher, { ContentSwitcherItem } from "./contentSwitcher";

describe("Content switcher snapshots", () => {
  it("Content switcher", () => {
    const { container } = render(
      <ContentSwitcher>
        <ContentSwitcherItem data-testid="item1" id="item1" title="Tab 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium,
            itaque quasi magni enim exercitationem repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item2" id="item2" title="Tab 2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item3" id="item3" title="Tab 3" icon="fire">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item4" id="item4" title="Tab 4" badge={9}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
      </ContentSwitcher>
    );
    expect(container).toMatchSnapshot();
  });
  it("Content switcher small", () => {
    const { container } = render(
      <ContentSwitcher small>
        <ContentSwitcherItem data-testid="item1" id="item1" title="Tab 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium,
            itaque quasi magni enim exercitationem repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item2" id="item2" title="Tab 2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item3" id="item3" title="Tab 3" icon="fire">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item4" id="item4" title="Tab 4" badge={9}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
      </ContentSwitcher>
    );
    expect(container).toMatchSnapshot();
  });
  it("Content switcher with dividers", () => {
    const { container } = render(
      <ContentSwitcher divider>
        <ContentSwitcherItem data-testid="item1" id="item1" title="Tab 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium,
            itaque quasi magni enim exercitationem repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item2" id="item2" title="Tab 2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item3" id="item3" title="Tab 3" icon="fire">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item4" id="item4" title="Tab 4" badge={9}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
      </ContentSwitcher>
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Content Switcher funcionality", () => {
  it("ContentSwitcher with onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ContentSwitcher onChangeItem={onChange}>
        <ContentSwitcherItem data-testid="item1" id="item1" title="Tab 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium,
            itaque quasi magni enim exercitationem repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item2" id="item2" title="Tab 2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem data-testid="item3" id="item3" title="Tab 3" icon="fire">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          </p>
        </ContentSwitcherItem>
        <ContentSwitcherItem id="item4" title="Tab 4" badge={9}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas! Rem cupiditate corrupti, molestias dolores distinctio excepturi
            perspiciatis numquam placeat ipsa necessitatibus facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas suscipit. Voluptatibus
            asperiores quia dicta ducimus distinctio?
          </p>
        </ContentSwitcherItem>
      </ContentSwitcher>
    );

    const itemBtn2 = getByTestId("item2");

    if (itemBtn2) fireEvent.click(itemBtn2);

    expect(onChange).toHaveBeenCalledWith("item2");
  });
});
