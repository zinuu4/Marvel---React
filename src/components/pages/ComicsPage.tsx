import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import motionParams from "../../services/motionParams";

const ComicsPage: React.FC = () => {
  return (
    <motion.div {...motionParams}>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>

      <AppBanner />
      <ComicsList />
    </motion.div>
  );
};

export default ComicsPage;
