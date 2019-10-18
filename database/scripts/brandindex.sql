ALTER TABLE `user_companies`
  ADD `twitter_url` VARCHAR(255) NULL DEFAULT NULL AFTER `website`;

ALTER TABLE `user_companies`
  ADD `linkedin_url` VARCHAR(255) NULL DEFAULT NULL AFTER `twitter_url`;

ALTER TABLE `user_companies`
  ADD `facebook_url` VARCHAR(255) NULL DEFAULT NULL AFTER `linkedin_url`;

ALTER TABLE `user_companies`
  ADD `instagram_url` VARCHAR(255) NULL DEFAULT NULL AFTER `facebook_url`;


ALTER TABLE `user_companies`
  ADD `youtube_url` VARCHAR(255) NULL DEFAULT NULL AFTER `instagram_url`;

ALTER TABLE `user_companies`
  ADD `vimeo_url` VARCHAR(255) NULL DEFAULT NULL AFTER `youtube_url`;