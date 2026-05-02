import { Box, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { Pagination as PaginationType } from "../../models/pagination";

type Props = {
    metadata: PaginationType;
    onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
    const { currentPage, totalPages, pageSize, totalCount } = metadata;
    
    // Access theme and media queries for dynamic sizing
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <Box
            display="flex"
            // Stack vertically on mobile, horizontally on tablet/desktop
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            marginTop={3}
            gap={2} // Adds spacing when stacked
        >
            <Typography variant="body2" color="text.secondary">
                Displaying {startItem}-{endItem} of {totalCount} items
            </Typography>

            <Pagination
                color="secondary"
                // Shrink the buttons on mobile, keep them large on desktop
                size={isMobile ? "small" : "large"}
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                // Hide "first" and "last" arrows if space is tight, or use simple sibling count
                siblingCount={isMobile ? 0 : 1}
                boundaryCount={isMobile ? 1 : 2}
            />
        </Box>
    );
}