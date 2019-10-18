ALTER TABLE `users`
    ADD COLUMN `working_as` VARCHAR(80) NULL AFTER `vc`,
    ADD COLUMN `senority` VARCHAR(80) NULL AFTER `working_as`;
