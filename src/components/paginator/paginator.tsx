import React, {useState} from 'react';
import Select, {Option} from '../select/select';

export interface IPaginator {
  /**
   * Number of pages existing
   */
  pages: number;
  /**
   * First page to be shown
   */
  defaultPage?: number;
  /**
   * Selector for the collapsed Variant
   */
  collapsed?: boolean;
  className?: string;
  /**
   * For truncating the default Paginator
   */
  truncate?: 'left' | 'right' | 'all';
  /**
   * In case of having collapsed variant,
   * options for inserting the jump element on different positions
   */
  collapsedOptions?: {
    jump?: 'right' | 'left' | 'all';
  };
  disabled?: boolean;
  onChangePage?: (page: number) => void;
  [key: string]: any;
}

const Paginator: React.FC<IPaginator> = (props) => {
  const {pages, defaultPage, collapsed, collapsedOptions, disabled, truncate, className, onChangePage, ...rest} = props;
  const [current, setCurrent] = useState<number>(defaultPage || 1);
  const setChunks = () => {
    const _chunksNum = arr.length / 5;
    const _chunks = [];
    for (let n = 0; n < _chunksNum; n++) {
      const _chunk = arr.slice(5 * n, 5 * n + 5);
      _chunks.push(_chunk);
    }
    return _chunks;
  };

  const arr = pages ? Array.from({length: pages}, (_, idx) => idx + 1) : [];
  const chunks = setChunks();

  const [chunk, setChunk] = useState<number>(arr.length > 6 ? Math.trunc(arr.findIndex((_val) => _val === current) / 5) : 0);

  const handleChunkIncrement = () => {
    setChunk(chunk + 1);
  };

  const handleChunkDecrement = () => {
    setChunk(chunk - 1);
  };

  const onChange = (page: number) => {
    setCurrent(page);
    if (page === arr[0]) {
      setChunk(0);
    } else if (page === arr[arr.length - 1]) {
      setChunk(chunks.length - 1);
    }
    if (typeof onChangePage === 'function') onChangePage(page);
  };
  if (arr && arr.length) {
    if (collapsed) {
      return (
        <div
          className={`paginator-collapsed ${className || ''}`}
          data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
        >
          {(collapsedOptions?.jump === 'left' || collapsedOptions?.jump === 'all') && (
            <button
              type="button"
              disabled={disabled}
              className={`paginator-icon ${current === arr[0] ? 'disabled' : ''}`}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-jump-previous` : undefined}
              onClick={() => onChange(arr[0])}
            >
              <span className="material-icons">first_page</span>
            </button>
          )}
          {arr.length !== 0 && (
            <button
              type="button"
              disabled={disabled}
              className={`paginator-icon ${current === arr[0] ? 'disabled' : ''}`}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-previous` : undefined}
              onClick={() => current !== arr[0] && onChange(current - 1)}
            >
              <span className="material-icons">navigate_before</span>
            </button>
          )}
          <Select
            disabled={disabled}
            name="paginator-selector"
            placeholder={defaultPage?.toString() || '1'}
            className="paginator-collapsed-dropdown"
            value={current}
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown` : undefined}
            onChange={onChange}
          >
            {arr &&
              arr.length > 0 &&
              arr.map((num) => (
                <Option
                  key={num + 'select-item'}
                  value={num}
                  label={num.toString()}
                  data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown-item-${num}` : undefined}
                >
                  {num}
                </Option>
              ))}
          </Select>
          <span>of {arr.length} pages</span>
          {arr.length !== 0 && (
            <button
              type="button"
              disabled={disabled}
              className={`paginator-icon ${current === arr[arr.length - 1] ? 'disabled' : ''}`}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-next` : undefined}
              onClick={() => current !== arr[arr.length - 1] && onChange(current + 1)}
            >
              <span className="material-icons">navigate_next</span>
            </button>
          )}
          {(collapsedOptions?.jump === 'right' || collapsedOptions?.jump === 'all') && (
            <button
              type="button"
              disabled={disabled}
              className={`paginator-icon ${current === arr[arr.length - 1] ? 'disabled' : ''}`}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-jump-next` : undefined}
              onClick={() => onChange(arr[arr.length - 1])}
            >
              <span className="material-icons">last_page</span>
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        className={`paginator ${className || ''}`}
        data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
      >
        {arr.length >= 6 && (
          <button
            type="button"
            disabled={disabled}
            className={`paginator-icon ${chunk === 0 ? 'disabled' : ''}`}
            onClick={handleChunkDecrement}
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-previous` : undefined}
          >
            <span className="material-icons">navigate_before</span>
          </button>
        )}
        {(truncate === 'left' || truncate === 'all') && chunk !== 0 && (
          <>
            <button
              type="button"
              className={current === arr[0] ? 'paginator-page_active' : 'paginator-page'}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-truncate-left` : undefined}
              onClick={() => onChange(arr[0])}
            >
              {arr[0]}
            </button>
            <span className="paginator-truncate">...</span>
          </>
        )}
        {chunks[chunk].map((_num) => (
          <button
            type="button"
            disabled={disabled}
            className={current === _num ? 'paginator-page_active' : 'paginator-page'}
            onClick={() => onChange(_num)}
            key={_num + 'paginator-num-page'}
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-num-${_num}` : undefined}
          >
            {_num}
          </button>
        ))}
        {(truncate === 'right' || truncate === 'all') && chunk !== chunks.length - 1 && (
          <>
            <span className="paginator-truncate">...</span>
            <button
              type="button"
              disabled={disabled}
              className={current === arr[arr.length - 1] ? 'paginator-page_active' : 'paginator-page'}
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-truncate-right` : undefined}
              onClick={() => onChange(arr[arr.length - 1])}
            >
              {arr[arr.length - 1]}
            </button>
          </>
        )}
        {arr.length >= 6 && (
          <button
            type="button"
            disabled={disabled}
            className={`paginator-icon ${chunk === chunks.length - 1 ? 'disabled' : ''}`}
            onClick={handleChunkIncrement}
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-button-next` : undefined}
          >
            <span className="material-icons">navigate_next</span>
          </button>
        )}
      </div>
    );
  }
  return null;
};

export default Paginator;
