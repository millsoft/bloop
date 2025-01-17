import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import Filters from '../../components/Filters';
import PageHeader from '../../components/ResultsPageHeader';

type Props = {
  suggestions: string[];
  isRepo?: boolean;
  isFolder?: boolean;
};

const NoResults = ({ suggestions, isRepo, isFolder }: Props) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const items = useMemo(
    () =>
      suggestions.map((s) => (
        <Button key={s} variant="secondary" size="small">
          {s}
        </Button>
      )),
    [suggestions],
  );
  return (
    <>
      <Filters
        isOpen={isFiltersOpen}
        toggleOpen={() => setIsFiltersOpen((prev) => !prev)}
      />
      <div className="p-8 flex-1 overflow-x-auto mx-auto max-w-6.5xl box-content">
        {isRepo || isFolder ? (
          <div className="flex flex-col gap-4 select-none">
            <h4 className="text-label-title">
              {isRepo
                ? 'Sorry, this repository is not ready for search'
                : 'The folder is empty'}
            </h4>
            <p className="body-s text-label-muted">
              {isRepo
                ? 'Wait for the repository to finish syncing and try again'
                : "We haven't found any files to index in this folder"}
            </p>
          </div>
        ) : (
          <PageHeader
            resultsNumber={0}
            showCollapseControls={false}
            loading={false}
          />
        )}
        {!isRepo && !isFolder && (
          <div className="mt-13 select-none">
            <p className="body-s text-label-muted">Suggested combinations</p>
            <div className="flex gap-3 flex-wrap mt-6 w-1/2">{items}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default NoResults;
