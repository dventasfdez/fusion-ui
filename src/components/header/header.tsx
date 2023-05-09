import React from 'react';
import HeaderLogo from './headerLogo';
import HeaderItem from './headerItem';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import {useDevice} from '../../hooks/useDevice/useDevice';
export {default as HeaderLogo} from './headerLogo';
export {default as HeaderItem} from './headerItem';
export interface IHeaderLanguage {
  id: string;
  label: string;
  selected?: boolean;
}

interface IHeaderContact {
  label: string;
  href: string;
}
export interface IHeaderProps {
  /**
   * Add class name in header
   */
  className?: string;
  /**
   * Handler search icon in header
   */
  onSearch?: () => void;
  /**
   * Set options and label of languages selector in header
   */
  languages?: IHeaderLanguage[];
  /**
   * Handle onClick option in languages selector
   */
  onClickLanguage?: (id: string) => void;
  /**
   * Show link to contact with label and href
   */
  contact?: IHeaderContact;
  [others: string]: any;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const {className, children, languages, contact, onSearch, onClickLanguage, ...rest} = props;
  const {isMobile} = useDevice();

  const renderHeaderContent = () => {
    let _logo = null;
    const _items: any[] = [];
    let _languageSelector: any = null,
      _language: IHeaderLanguage | undefined,
      _search: any = null,
      _contact: any = null;
    React.Children.forEach(children, (_child: any) => {
      if (_child.type === HeaderLogo) {
        _logo = _child;
      } else if (_child.type === HeaderItem) {
        if (isMobile) {
          const _childClone = React.cloneElement(_child, {
            ..._child.props,
            'data-mobile': true,
            key: _child.props.id || `header-item-${_items.length}`,
            onClick: () => {
              if (typeof _child.props?.onClick === 'function') _child.props.onClick();
            },
          });
          _items.push(_childClone);
        } else _items.push(_child);
      }
    });
    if (languages) {
      _language = languages.find((_lang: IHeaderLanguage) => _lang.selected);
      _languageSelector = (
        <Dropdown
          key="header-languages-dropdown"
          className="header-languages"
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-languages-dropdown` : undefined}
        >
          <DropdownButton
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-languages-dropdown-btn` : undefined}
          >
            <>
              {_language?.label}
              <span className="material-icons">expand_more</span>
            </>
          </DropdownButton>
          <DropdownMenu>
            <ul>
              {languages.map((_lang: IHeaderLanguage, _idxLang: number) => (
                <li
                  className={`dropdown-item ${_lang.selected ? 'selected' : ''}`}
                  id={_lang.id || `language-${_idxLang}`}
                  key={_lang.id || `language-${_idxLang}`}
                  onClick={() => {
                    if (typeof onClickLanguage === 'function') onClickLanguage(_lang.id);
                  }}
                  data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-language-${_idxLang}` : undefined}
                >
                  {_lang.label}
                </li>
              ))}
            </ul>
          </DropdownMenu>
        </Dropdown>
      );
    }
    if (typeof onSearch === 'function') {
      _search = (
        <button
          type="button"
          className="header-search"
          onClick={onSearch}
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-search-btn` : undefined}
        >
          <span className="material-icons">search</span>
        </button>
      );
    }

    if (contact) {
      _contact = isMobile ? (
        <Dropdown
          className="header-contact-dropdown"
          keepShown
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-contact-dropdown` : undefined}
        >
          <DropdownButton
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-contact-dropdown-btn` : undefined}
          >
            <span className="material-icons">person</span>
          </DropdownButton>
          <DropdownMenu>
            <a
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-contact-link` : undefined}
              key="header-contact"
              className="header-contact link_small"
              href={contact.href}
            >
              {contact.label}
            </a>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <a
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-contact-link` : undefined}
          key="header-contact"
          className="header-contact link_small"
          href={contact.href}
        >
          {contact.label}
        </a>
      );
    }

    if (isMobile) {
      return (
        <>
          {_logo}
          <div className="header-content">
            {_contact}
            {_search}
            <Dropdown
              keepShown
              className="header-items-dropdown"
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-items-dropdown` : undefined}
            >
              <DropdownButton
                data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-items-dropdown-btn` : undefined}
              >
                <span className="material-icons">menu</span>
              </DropdownButton>
              <DropdownMenu>
                <div className="header-items">{_items}</div>
                {_languageSelector}
              </DropdownMenu>
            </Dropdown>
          </div>
        </>
      );
    } else if (_contact) {
      return (
        <>
          <div className="header-top">
            {_contact}
            {_languageSelector}
          </div>
          <div className="header-bottom">
            {_logo}
            <div className="tab-list">{_items}</div>
            {_search}
          </div>
        </>
      );
    }
    return (
      <>
        {_logo}
        <div className="tab-list">{_items}</div>
        {_languageSelector}
        {_search}
      </>
    );
  };

  return (
    <div className={`header ${className || ''}`} style={contact && !isMobile ? {display: 'block'} : undefined} {...rest}>
      {renderHeaderContent()}
    </div>
  );
};

export default Header;
