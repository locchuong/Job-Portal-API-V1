import applicationsMapper from "@/features/applications/applications.mapper";
import jobsMapper from "@/features/jobs/jobs.mapper";
import usersMapper from "@/features/users/users.mapper";
import { createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";

const mapper = createMapper({ strategyInitializer: pojos() });

usersMapper(mapper);
jobsMapper(mapper);
applicationsMapper(mapper);

export default mapper;
 