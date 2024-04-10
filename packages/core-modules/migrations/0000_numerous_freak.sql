CREATE TABLE `tasks` (
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`task_name` text NOT NULL,
	`task_description` text NOT NULL
);
