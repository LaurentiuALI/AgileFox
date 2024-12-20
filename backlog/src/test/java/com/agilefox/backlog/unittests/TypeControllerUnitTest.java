package com.agilefox.backlog.unittests;

import com.agilefox.backlog.controller.TypeController;
import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.dto.TypeResponseDTO;
import com.agilefox.backlog.service.TypeService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TypeController.class)
public class TypeControllerUnitTest {

    private static final String typeName = "bug";
    private static final Long id = 1L;

    private static TypeResponseDTO defaultType;

    @MockBean
    private TypeService typeService;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        defaultType = new TypeResponseDTO();
        defaultType.setId(id);
        defaultType.setName(typeName);
    }

    @Test
    public void getTypesEndpoint() throws Exception {
        List<TypeResponseDTO> types = Collections.singletonList(defaultType);

        Mockito.when(typeService.getTypes())
                .thenReturn(types);

        final String link = "/api/type";

        this.mockMvc.perform(MockMvcRequestBuilders
                        .get(link)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isFound())
                .andExpect(jsonPath("$", hasSize(types.size())));
    }

    @Test
    public void createTypeEndpoint() throws Exception {
        TypeRequestDTO typeRequest = new TypeRequestDTO();
        typeRequest.setName(typeName);

        Mockito.when(typeService.addType(Mockito.any(TypeRequestDTO.class)))
                .thenReturn(defaultType);

        final String link = "/api/type";

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post(link)
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "bug"
                                }
                                """))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(typeName));
    }
}
