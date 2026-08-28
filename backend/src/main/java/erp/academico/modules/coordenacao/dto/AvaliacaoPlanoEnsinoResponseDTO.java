package erp.academico.modules.coordenacao.dto;

import erp.academico.modules.coordenacao.model.StatusPlanoEnsino;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvaliacaoPlanoEnsinoResponseDTO {

    private UUID                id;
    private String              autorNome;
    private StatusPlanoEnsino   statusAnterior;
    private StatusPlanoEnsino   statusNovo;
    private String              parecer;
    private LocalDateTime       criadoEm;
}
